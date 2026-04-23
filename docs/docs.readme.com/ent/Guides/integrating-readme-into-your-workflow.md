# Integrating into Your Workflow

As documentation scales, it requires the same rigor as product development. Without a defined workflow, content quickly falls out of sync with releases.

This guide documents the standard documentation workflows used by enterprise teams integrating ReadMe into CI/CD pipelines. These workflows are designed to:

* Keep documentation versioned with releases
* Enforce clear ownership and review processes
* Scale across teams, products, and content

If you’re setting this up for the first time, follow the **recommended** workflow below. It reflects how most organizations successfully operate at scale.

***

## Workflow Patterns

<CardTabs
  items={[
    {
      title: 'Branching',
      icon: 'fa-duotone fa-solid fa-code-branch',
      iconColor: 'var(--blue)',
			isRecommended: true,
      description: 'Structured review for documentation updates.',
      content: (
				<>
					<h3>Recommended: Branching (Documentation-focused)</h3>
					<h4>Best for teams</h4>
        	<ul>
 						<li>Are documentation-heavy</li>
       	  	<li>Work with multiple contributors</li>
            <li>Release frequently (weekly or faster)</li>
						<li>Review content asynchronously</li>
         	 </ul>
       	  <h4>How it works</h4>
          <p>Branches let you create and review content in isolation without affecting the live version of your documentation. Teams can:</p>   
					<ul>
 						<li>Work on multiple updates in parallel</li>
         		<li>Save changes without publishing</li>
            <li>Review updates before merging them live</li>
						<li>Merge content on your own schedule</li>
          </ul>
          <p>If your team prefers writing in Markdown or managing docs in source control, syncing ReadMe with GitHub or Gitlab unlocks a more robust, reviewable workflow.</p>    
					<ul>
 						<li>Docs live in your GitHub repo as<code>.md</code> files (MDX supported)</li>
         		<li>Changes pushed to GitHub appear in ReadMe</li>
            <li>Changes made in ReadMe sync back to GitHub</li>
						<li>Branches sync too: create them in GitHub or ReadMe</li>
          </ul>
					<h4>Features to set up</h4>
          <ul>
						<li>Bi-directional sync supports GitHub or GitLab <b>(recommended)</b></li>
          </ul>
					<p>Learn more:{' '}
  <a href="https://docs.readme.com/main/page/branching-for-enterprise" target="_blank" rel="noreferrer">
    Branching for Enterprise
            </a>.</p>
				</>
			 )
    },
    {
      title: 'Docs as Code',
      icon: 'fa-duotone fa-solid fa-code',
      iconColor: 'var(--blue)',
      description: 'Docs as Code with CI/CD publishing.',
      content: (
				<>
					<h3>Docs as Code (Git-focused)</h3>
					<h4>Best for teams that</h4>
        	<ul>
 						<li>Practice Docs as Code</li>
       	  	<li>Manage Markdown and OpenAPI definitions in Git</li>
            <li>Use pull requests as the primary review mechanism</li>
         	 </ul>
       	  <h4>How it works</h4>
          <p>All documentation and OpenAPI changes live in Git. Your existing CI/CD workflow stays the same:</p>   
					<ul>
 						<li>Make changes locally</li>
         		<li>Open a pull request</li>
            <li>Review and merge</li>
						<li>CI/CD publishes updates to ReadMe use <code>rdme</code></li>
          </ul>
          <p>ReadMe acts as the publishing and hosting layer while Git remains the source of truth.</p>    
          <h4>Features to set up</h4>
					<ul>
          	<li>ReadMe CLI (<code>rdme</code>)</li>
            <li>CI/CD (GitHub Actions, GitLab CI, etc.)</li>
					</ul>
					<p>Learn more:{' '}
  <a href="https://docs.readme.com/main/docs/github-actions-docs-example" target="_blank" rel="noreferrer">
    GitHub Actions: Markdown
            </a>.</p>
					<p>Learn more:{' '}
  <a href="https://docs.readme.com/ent/v1.0_onboard-guide/update/docs/something-about-setting-up-their-pipeline" target="_blank" rel="noreferrer">
    GitHub Actions: OpenAPI
            </a>.</p>
				</>
			 )
    },
		{
      title: 'Hybrid Teams',
      icon: 'fa-duotone fa-solid fa-circles-overlap',
      iconColor: 'var(--blue)',
      description: 'Split ownership across teams and tooling.',
      content: (
				<>
					<h3>Hybrid Teams (Product & Docs)</h3>
					<h4>Best for teams that</h4>
        	<ul>
 						<li>Have distributed ownership across teams</li>
       	  	<li>Manage APIs in Git</li>
            <li>Want documentation to move quickly in ReadMe</li>
						<li>Are scaling across products or content surfaces</li>
          </ul>

       	  <h4>How it works</h4>
          <p>This setup combines the strengths of both workflows:</p>   
					<ul>
 						<li>Product teams manage specifications in Git</li>
         		<li>CI/CD validates and publishes updates using <code>rdme</code></li>
            <li>Content teams manage guides and API reference content in ReadMe</li>
						<li>Branches and versions support review and releases</li>
          </ul>
          
          <h4>Features to set up</h4>
					<ul>
          	<li>ReadMe CLI (<code>rdme</code>)</li>
          	<li>CI/CD (GitHub Actions, GitLab CI, etc.)</li>
					</ul>
					<p>Learn more:{' '}
  <a href="https://docs.readme.com/main/page/branching-for-enterprise" target="_blank" rel="noreferrer">
    Branching
            </a>.</p>
					<p>Learn more:{' '}
  <a href="https://docs.readme.com/ent/v1.0_onboard-guide/update/docs/something-about-setting-up-their-pipeline" target="_blank" rel="noreferrer">
    GitHub Actions: OpenAPI
            </a>.</p>
				</>
			 )
    },
  ]}
/>

***

## User Roles

Use ReadMe's user roles to control access to Group-level dashboards and projects for all teammates. Roles determine where teammates can make changes:

* **Admin**: Full access to all dashboards and projects.
* **Editors**: Can create and edit hub content; no access to Group dashboards.
* **Viewers**: Can view documentation only; no editing permissions and no access to Group dashboards.
* **Custom**: Assign different roles per project to fine-tune access.

***

## Key Terms

These are building blocks shared across all setups:

* **ReadMe CLI (`rdme`):** Automates OpenAPI validation, uploads, and documentation updates from CI/CD pipelines.
* **Git, GitHub, GitLab:** Acts as the source of truth for OpenAPI specifications and Markdown documentation (optional).
* **CI/CD (GitHub Actions, GitLab CI, etc):** Runs validation, linting, and publishing steps on pull requests and merges.
* **Bi-Directional Sync:** Keeps content aligned when edits happen in both Git and the ReadMe Editor.

***

## FAQ

<Accordion title="What does the repository structure look like?" icon="fa-info-circle">
  * `/docs` -> Markdown documentation
  * `/openapi` -> OpenAPI definitions
  * `/scripts` -> CI/CD helpers
</Accordion>

<br />