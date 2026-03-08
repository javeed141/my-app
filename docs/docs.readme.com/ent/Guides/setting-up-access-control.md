# Setting Up Access Control

Setting up access is tricky. We're here to help though! We've taken a couple of measures to make sure that we can support some common use cases that our enterprise clients have. Here, we'll take a look at how some of our customers are integrating their SAML access to manage private access.

We think it's useful to think about your access in two main channels: <Glossary>internal</Glossary> & <Glossary>external</Glossary>.

With that being said, there are a few ways you can set up access. Below, we'll lay out each steps on how to implement a solution:

* My documentation is totally private and I want my <Glossary>external</Glossary> users to log in via SAML
* Some of my projects will be private and I want my <Glossary>external</Glossary> users to log in via SAML
* I want my <Glossary>internal</Glossary> users to log in via SAML and I want my <Glossary>external</Glossary> users to log in via Custom OAuth.
* I have a totally custom solution and want my users to log in via that.

> 🚧 Did you set up SAML yet?
>
> If you haven't set up your SAML set up yet, check out [this page](https://docs.readme.com/ent/docs/setting-up-sso) to help with getting started. In addition, this guide assumes that you have an enterprise parent project set up with ReadMe.

## Scenario 1: My documentation is totally private and I want my <Glossary>external</Glossary> users to log in via SAML

We'll divide up the work into two pieces:

1. Setting up the private docs
2. Setting up your <Glossary>login mechanisms</Glossary>

### Setting up private docs

Setting this up is quite easy. First, go to the **Projects** page in your Enterprise Group dashboard. From there, click the Public/Private dropdown, and select Private so that only Teammates and End Users with permissions can access the project's developer hub. You also have the option to set a password for private docs.

<Image alt="Green means it's private!" align="center" src="https://files.readme.io/5b72d04-CleanShot_2023-02-23_at_19.52.19.gif">
  Green means it's private!
</Image>

### Setting up your login mechanism

We have four <Glossary>login mechanisms</Glossary>. When you have correctly set up your project, you will be able to control how your <Glossary>End Users</Glossary>  will log in to the private project. One thing to note is that you may not need to set this up. If you have set up SAML already, your <Glossary>End Users</Glossary> users will already be prompted to log in with SAML.

<Image alt="Options are only enabled if you've set them up." align="center" src="https://files.readme.io/0c60c31-login_method_-_ent_group.png">
  Options are only enabled if you've set them up.
</Image>

## Scenario 2: Some of my projects will be private and I want my <Glossary>End Users</Glossary> users to log in via SAML

This is very similar to scenario 1. All you would need to do to keep some docs public is to determine which ones you want private and only toggle those ones.

## Scenario 3: I have a totally custom solution and want my external users to log in via that.

If you want to do this, you can use a custom login URL which you can specify here: `<https://dash.readme.io/project/[YOUR](https://dash.readme.io/project/[YOUR> PROJECT]/[VERSION]/custom-login`

<Image align="center" className="border" border={true} src="https://files.readme.io/aeaaa86-Screen_Shot_2019-12-06_at_11.35.21_AM.png" />