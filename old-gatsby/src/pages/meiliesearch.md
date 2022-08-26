---
title: 'Deploying MeiliSearch on AWS'
date: '2020-04-17'
thumbnail: '../images/aws-eb-meilisearch.png'
---

The gold standard for search is currently provided by [Algolia](https://www.algolia.com/). They offer many feature rich products, but at their core is the search API which is easy to setup and very fast. Yet this can get pricey - once you need more than 10K records the price goes up to \$29/mo.

[MeiliSearch](https://www.meilisearch.com/) is a blazing fast and lightweight search-engine that competes with Algolia in both speed and relevancy of results. It's easy to deploy and has an intuitive API, like Algolia.

MeiliSearch is written in Rust. Rust produces fast and resource efficient binaries. This means we can squeeze more performance out of low powered machines and reduce the running cost.

The best part is that it is open source! MeiliSearch is gaining in popularity and is proving to be a great tool for search. And since it is written in Rust, we can have confidence that it will run correctly.

[Click here](/lute-search) to see a live example of MeiliSearch that contains more than 16,000 documents.

## AWS Elastic Beanstalk

Let's deploy our search API to Elastic Beanstalk using the official Docker image from MeiliSearch.

- Login to the AWS console
- Navigate to Elastic Beanstalk
- Click "Create Application"
- Enter application name (I've entered "meilisearch-test")
- In the "Platform" drop-down choose Docker (you can keep the defaults for "Platform branch" and "Platform version")
- Select the "Upload your own code" radio button
- Select "Local file"

On your local system, create a file called `Dockerrun.aws.json` and paste this in

```json
{
  "AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "getmeili/meilisearch:latest"
  },
  "Ports": [
    {
      "ContainerPort": 7700,
      "HostPort": 7700
    }
  ]
}
```

- Press the "Choose file" button and select your `Dockerrun.aws.json` file you just created

At this point, the console should look something like this:

![](../images/aws-eb-meilisearch.png)

- Now press the "Configure more options" button at the bottom
- Select the "Single instance (Free Tier eligible)" radio button (the EC2 instance will be `t2.micro` which is more than powerful enough for testing)
- (Optional) To use the built-in authentication to protect the read/write routes of the API you need to add the `MEILI_MASTER_KEY` environment variable
  - In the configuration pane, go to "Software", click "Edit", find the "Environment properties" block, enter `MEILI_MASTER_KEY` in the "value" field and create a string for the value.
  - Press save
- Once you're happy with the configuration, you can press "Create app"

## Search

Once Elastic Beanstalk has launched the server, you can follow MeiliSearch [documentation](https://docs.meilisearch.com/guides/introduction/quick_start_guide.html#create-your-index) to create your search index, add documents, and start using your search API!
