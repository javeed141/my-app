# Postman

Postman is a user-friendly interface for sending API requests and viewing responses. With Postman you can test any API without a development environment.

We have built a Postman collection that contains all of Lithics APIs

## Getting Started

### 1. Download Postman

Download Postman: <Anchor label="<Anchor label=&#x22;[https://www.postman.com/downloads/](https://www.postman.com/downloads/)&#x22; target=&#x22;_blank&#x22; href=&#x22;https://www.postman.com/downloads/&#x22;>[https://www.postman.com/downloads/](https://www.postman.com/downloads/)</Anchor>" target="_blank" href="https://www.postman.com/downloads/">[https://www.postman.com/downloads/](https://www.postman.com/downloads/)</Anchor>

<a target="_blank" href="https://www.postman.com/lithic-global/lithic-api/collection/49153688-f3d156db-b721-456f-97b3-113335a47055" class="button-postman">▶ Run in Postman</a>

### 2. Fork the Collection

Select the collection via the three dot menu. Select Fork.

<Image align="center" border={true} width="600px" src="https://d1jvjlrimvr0n9.cloudfront.net/stable/b6100793e29f42ad_4e5f1874febbdca927dd672ef0252a2c94e30dcb8c79df46bad7b5b759230887-fork.png" className="border" />

When you Fork, Postman will ask you for a destination to Fork the Collection to. A copy of the collection will be created at the location you designate.

<Image align="center" border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/042e2d16ac89ad9e_408c484643a1ef91415ed34f3d927aabad448a55ce732d3312540c2135576606-fork_dialogue.png" />

#### Options

<Image align="center" border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/154917050cd9ba24_8ef5079256a139c46b60c89bc2a4a208caaff885a530b8ce3b5ea51f72169e6a-envs.png" />

#### You can:

1. Add a label to distinguish the collection that you are copying.
2. You can select watch original collection to get notifications if the source collection gets updated. See [Updating Postman Collection.](#updating-the-postman-collection)

<Callout icon="📘" theme="info">
  Make sure you fork the environments as well. These contain the necessary environment variables to make the collection work properly.
</Callout>

Future changes to the Lithic Public Collection will be shown as an icon in the menu, and you will be able to Pull Updates ([see below.](#pulling-new-changes))

### 3. Add API key env

You will need to add your API key to the corresponding environment in Postman. To add your <a href="https://app.lithic.com/settings">Sandbox key,</a> navigate to the environments tab on the left of the Postman window.

<Image align="center" border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/61f4623d555521a5_72602a874d592e214431de78c1713f73f2243cefb98f4680007a0a148e9d4a29-sandbox_api_key.png" />

For example, you can copy your Sandbox API key and add it to the `apiKey`environment variable in the Postman environment labeled "Sandbox"

## Using the Postman Collection

<Image align="center" border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/b3dd36e9701fb3d4_832f746438108b2e0a51ee921a7cd718a6f0ed25fca23de35bd9c96826ccc588-env_box.png" />

1. Set env - in the top right corner, make sure to select the environment to use.

   <Image align="left" border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/7f6257c7cd02e60b_f42b04cabb93656a4b675b97e3767fa0795487a9d0e9c9996000e38f9fda5fae-env_select.png" />

2. Make a request - you can now make requests within the API collection. The collection will use the variables in the environment with all your requests.

### Updating the Postman Collection

#### Pulling Updates

<Image align="center" border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/ee0d525a227c39e7_7015d77d915bda7c275b27b0eefad27f83c19efb899278f507c8a021611bbb31-pullchanges.png" />

When Lithic updates the Postman Collection, you will see an update icon as a downward arrow next to the **Pull Changes** text in the collections menu.

#### Pulling New Changes

1. Select the collection you wish to update
2. From the collections menu select **Pull Changes**
3. You will see a list of changes before you accept.
4. Select accept and the changes will be incorporated into your Collection.

<Callout icon="📘" theme="info">
  Note: If you've made customizations to the pre-defined requests. Updates *may* override your changes. Postman will notify you if there are conflicts.
</Callout>

### Workflows

In addition to our APIs, we also created quickstart workflows that can assist with testing.

We have a quickstart workflow that works along side our Quickstart guide, so that you can follow along with ease.

<Image align="left" border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/f1c25ef636e810ee_61b00b89c259d59271bc3d6c3aca35caeca7acaac427dea65955ae087dadbb37-postman_quickstart.png" />