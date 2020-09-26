<!--
    Thank you for reading this
    If you´re having any problem with this project please contact in the issues session
-->

<!-- VARS -->
[meet-notifier-logo]: https://user-images.githubusercontent.com/54639269/94340524-ec422c80-ffd8-11ea-82ee-edeedda808ee.png
[license-badge]: https://img.shields.io/github/license/pmqueiroz/meet-notifier?color=%2300897B
[codacy-badge]: https://app.codacy.com/project/badge/Grade/36d9e0a5dfa2434daaadfe2d1edbb3e0
[msi]: https://img.shields.io/badge/Apk-download-important?logo=windows&color=%2300897B
[license-url]: https://github.com/pmqueiroz/meet-notifier/blob/master/LICENSE
[msi-url]: https://github.com/pmqueiroz/meet-notifier/releases/download/v0.0.1-alpha/Meet_Notifier_x64.msi
[issues-url]: https://github.com/pmqueiroz/meet-notifier/issues/
[codacy-url]: https://www.codacy.com/manual/pmqueiroz/meet-notifier/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pmqueiroz/meet-notifier&amp;utm_campaign=Badge_Grade
[node-url]: https://nodejs.org/en
[yarn-url]: https://classic.yarnpkg.com/
[npm-url]:  https://www.npmjs.com/


<!-- VARS -->


<div align="center">

![meet-notifier][meet-notifier-logo]

</div>

<p align="center">
    Desktop tray app and meet browser to notify scheduled meetings on <a href="https://calendar.google.com" >Google Calendar</a>
</p>

<div align="center">

[![License][license-badge]][license-url]
[![Msi Download][msi]][msi-url]
[![Codacy Badge][codacy-badge]][codacy-url]

</div>

### Content
* [Getting Started](#Getting-Started-)
    * [Cloning](#Cloning)
    * [Requirements](#Requirements)
    * [Running](#Running)
* [Issues](#Issues-)
    * [Report](#Report)
    * ~~Trouble Shooting~~
* [Contributing](#Contributing-)
* [License](#License-)

### Getting Started 🚀

#### Cloning

```ps
# Clone the repository using git
$ git clone https://github.com/pmqueiroz/meet-notifier.git

# Access the project folder
$ cd meet-notifier
```

#### Requirements
* [Node.js][node-url]
* [Yarn][yarn-url] or [npm][npm-url]

This project use third party dependencies that need to be installed, use that command to install all needed dependencies

```ps
$ yarn install
```

>The above command will install all third party dependencies used. If you want to install manually all the dependencies follow the steps bellow

```ps
$ yarn add electron -D
$ yarn add clipboardy
$ yarn add install

# Optionally dependencies (used just on built-in or dev)
$ yarn add electron-wix-msi -D
$ yarn add eslint -D
$ yarn add husky -D
$ yarn add lint-staged -D
```

#### Running

To start the program run

```ps
$ yarn dev
```
### Issues 🐛

#### Report

In case you are having any problem do not be shy to report to us in [Issues][issues-url] session.

### Contributing 🤝

There are many forms to contribute with the project, first of all you can give this github repo a Star.

If you want do help with the code follow the steps bellow

```ps
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.
$ gh repo fork pmqueiroz/meet-notifier

# Clone your fork
$ git clone {your-fork-url}
$ cd meet-notifier

# Create a branch with your feature
$ git checkout -b {branch-name}

# Make the commit with your changes
$ git commit -m 'Feat: {feature-name}'

# Send the code to your remote branch
$ git push origin {branch-name}
```

Then send a Pull Request that will be analyzed and approved if it helps with the project

### License 📝
This project is under the MIT license. See the [LICENSE][license-url] for more information.
