# Creating a Global Landing Page

If you set up an Enterprise group project (see [Upgrading to a Group Project](https://docs.readme.com/ent/docs/upgrading-to-group-project)), you can use that project to configure a global docs portal or landing page that your users can use to view and search all your doc projects.

Your group project is only a shell for your other projects; it contains no documentation pages itself. However, it does have one page to display: a global landing page. By default, your group project comes with an almost entirely blank global landing page. It includes a search field for all child projects, links to your child projects, and little else. To populate it, you will need to either:

* Design the page and have a front-end developer at your organization create the source code of the page for you.
* Redirect to one of your existing project's landing pages as your new global landing page
* Redirect to any custom landing page that you serve yourself.

> 📘 Global Landing Page Code Restrictions
>
> If you create code to paste into the global landing page, all code must be contained in one file, and code is limited to HTML with embedded vanilla Javascript and CSS.\
> If you want greater flexibility and power for your code, then use the Redirect Instead field. In this case, however, you have to re-implement such functionality as the global search bar.

To configure ReadMe to use your global landing page:

1. Go to dash.readme.io/group/`yourGroupProject`/global-landing-page.
2. Either:
   * copy and paste your source code into the Global Landing Page field.
   * add a link to the URL of the page you wish to display in the Redirect Instead field.

## Templating in the global landing page

The global landing page now allows you to utilize a templating engine called [Liquid](https://github.com/docs/liquid) to build out your HTML. That means you can have access to and iterate over child projects and their categories and pages.

```html
<div id="main" class="container">
  <div class="row">
    <div class="col-sm-5">
      <h1>{{parentProject.name}}</h1>
      <p>{{parentProject.description}}</p>
    </div>
    <div class="col-sm-7">
      <h4>Projects</h4>
      {% for child in parentProject.childrenProjects %}
      	<div class="col-sm-6">
          <div class="project">
            <h4 class="child">{{child.name}}</h4>
            <div class="guides">
              {% for category in child.guides %}
                <h5 class="category">{{category.title}}</h5>
              	<ul>
                  {% for page in category.pages %}
                  <li><a href="{{page.slug}}" class="page">{{page.title}}</a></li>
                  {% endfor %}
                </ul>
              {% endfor %}
            </div>
          </div>
      </div>
      {% endfor %}
    </div>
```

With this new syntax, you will have access to these properties

```text
parentProject.name
parentProject.description
parentProject.subdomain
parentProject.childrenProjects - your child projects
parentProject.childrenProjects.guides - your guide categories
parentProject.childrenProjects.guides.pages - your pages inside of your guides
parentProject.childrenProjects.api_reference.pages - your pages inside of your api explorer
currentLang - the language that the user is currently in
user - the current user name, or false
```