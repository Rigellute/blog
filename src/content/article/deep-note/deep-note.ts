import * as Tone from 'tone'

// How long the notes will play for
const DURATION = 16

// Some additional time to let the notes fade out when stopping
const STOPPING_TIME = 1000

// Big D Major chord to finish on.
const NOTES = [
  'D0',
  'D1',
  'A1',
  'D2',
  'A2',
  'D3',
  'A3',
  'D4',
  'A4',
  'D5',
  'F#5',
]

type AudioNode = {
  reverb: Tone.Reverb
  env: Tone.Envelope
  synth: Tone.Synth
  filter: Tone.Filter
  gain: Tone.Gain
  vibrato: Tone.Vibrato
}

export class DeepNote {
  isPlaying = false
  private audioNodes: AudioNode[] = new Array(NOTES.length)
  private subscribers: ((value: boolean) => void)[] = []
  private currentTimeout: NodeJS.Timeout | null = null

  private updateIsPlaying(isPlaying: boolean) {
    // Only proceed if the state actually changes
    if (isPlaying !== this.isPlaying) {
      this.isPlaying = isPlaying
      // Notify all subscribers
      this.subscribers.forEach((subscriber) => subscriber(isPlaying))
    }
  }

  subscribe(subscriber: (isPlaying: boolean) => void) {
    this.subscribers.push(subscriber)
    // Immediately call the subscriber with the initial value
    subscriber(this.isPlaying)
  }

  stop() {
    this.audioNodes.forEach((node) => {
      // Let the note fade out
      node.synth.triggerRelease()
      setTimeout(() => {
        // Collect the garbage
        node.synth.dispose()
        node.reverb.dispose()
        node.env.dispose()
        node.filter.dispose()
        node.gain.dispose()
        node.vibrato.dispose()
      }, STOPPING_TIME)
    })
    // Reset the audio nodes
    this.audioNodes = new Array(NOTES.length)
    this.updateIsPlaying(false)
  }

  start() {
    if (this.isPlaying) {
      this.stop()
    }

    const frequencies = NOTES.map((note) => ({
      // Random note between G3 and G4
      start: getRandomInt(200, 400),
      end: Tone.Frequency(note).toFrequency(),
    }))

    frequencies.forEach((freq) => {
      // Create a synthesizer with a "fatsawtooth" oscillator for that rich, full sound.
      const sawtoothSynth = new Tone.Synth({
        oscillator: {
          type: 'fatsawtooth',
        },
        envelope: {
          attack: 3,
          decay: 0.8,
          sustain: 1.0,
          release: 2.0,
        },
        // Randomly detune the oscillator to give it a more analog sound
        detune: getRandomInt(-2, 2),
      })

      // Apply a vibrato effect for a slight oscillation in pitch, adding to the richness of the sound.
      const vib = new Tone.Vibrato(freq.end, 0.1)
      // Use a gain node to control the volume.
      const gain = new Tone.Gain()
      // Add a reverb effect for spatial depth.
      const reverb = new Tone.Reverb(1)

      // Add a low pass filter to cut off the high frequencies.
      // Frequencies above 11,000 Hz will be gradually reduced in volume,
      // creating a smoother and less harsh sound
      // by removing high-frequency noise or harshness from the output audio
      const filter = new Tone.Filter(11000, 'lowpass', -12)

      // Create an envelope to control the frequency and gain of the synthesizer.
      // This is the source of the sweeping sound that is characteristic of the THX Deep Note.
      const envelope = new Tone.Envelope({
        attack: 10,
        decay: 9,
        sustain: 1.0,
        release: 0.0,
      })

      // Normalize the frequency and gain values to the desired range
      // This allows the envelope to control the frequency and gain of the synthesizer
      const freqScale = new Tone.Scale(freq.start, freq.end)
      const gainScale = new Tone.Scale(0.05, 0.7)

      // Connect the synthesizer to the gain node, vibrato, reverb, and filter
      sawtoothSynth.connect(gain)
      gain.connect(vib)
      vib.connect(reverb)
      reverb.connect(filter)

      // Connect the envelope to the frequency and gain scales
      envelope.connect(freqScale)
      envelope.connect(gainScale)
      freqScale.connect(sawtoothSynth.frequency)
      gainScale.connect(gain.gain)

      // Connect the filter to the main output
      filter.toDestination()

      // Start the synthesizer
      sawtoothSynth.triggerAttackRelease(freq.start, DURATION)

      // Start the envelope
      envelope.triggerAttackRelease(5)

      this.audioNodes.push({
        reverb,
        env: envelope,
        synth: sawtoothSynth,
        filter,
        gain,
        vibrato: vib,
      })
    })

    this.updateIsPlaying(true)

    // Prevent a previous timeout from stopping the notes
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout)
    }

    this.currentTimeout = setTimeout(() => {
      this.stop()
    }, DURATION * STOPPING_TIME)
  }
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
