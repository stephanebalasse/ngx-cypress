'use strict';

const Generator = require('@ngx-rocket/core');
const chalk = require('chalk');
const pkg = require('../../package.json');

class NgxCypressGenerator extends Generator {
  // DO NOT add a constructor, it won't be called.
  // Use initializing() method instead.
  //
  // See Yeoman's doc run loop priorities for the list of specific tasks:
  // http://yeoman.io/authoring/running-context.html

  initializing() {
    // Setting version allows Yeoman to notify the user of updates
    this.version = pkg.version;
    this.log(`Using ${chalk.cyan('ngx-cypress')} ${chalk.green(this.version)}`);
  }

  beforeWriting() {
    // Augment this generator's properties with shared properties so it can be
    // used in templates
    Object.assign(this.props, this.sharedProps);
  }

  end() {
    if (this.props.addCypress && !this.updating) {
      this.log(`- $ ${chalk.green(`${this.packageManager} run cypress`)}: Launch e2e Cypress`);
    }
  }
}

module.exports = Generator.make({
  // Base directory of your templates
  baseDir: __dirname,

  // Your generator (optional, you can use only templates)
  generator: NgxCypressGenerator,

  // The type of your generator, can be 'client', 'server' or 'fullstack' (optional)
  type: 'client',

  // Your generator prompts (optional)
  // See https://github.com/sboudrias/Inquirer.js#objects for details
  prompts: [
    {
      type: 'confirm',
      name: 'addCypress',
      message: 'Do you want Cypress ?',
      default: true
    }
  ]
});
