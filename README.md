# persogenius.de

_persogenius.de_ is a simple web application designed to generate valid machine-readable zones for German ID cards, compliant with the specifications as of August 2021.

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
  - [Public Instance](#public-instance)
- [Security](#security)
- [Credits](#credits)

## About

TODO


| 0 | 1 | ... | 8 | 9 | A  | B  | ... | Y  | Z  |
|---|---|-----|---|---|----|----|-----|----|----|
| 0 | 1 | ... | 8 | 9 | 10 | 11 | ... | 34 | 35 |


## Installation

_persogenius.de_ is built on the [Jekyll](https://jekyllrb.com/docs/) static website generator; therefore, Jekyll must be installed prior to proceeding.

Clone the repository from GitHub to your local machine:
```bash
git clone https://github.com/inwerk/persogen.git
```

Change the current directory to the newly cloned `persogen` directory.:
```bash
cd persogen
```

Generate the static site files:
```bash
bundle exec jekyll build
```

Start a local server to serve the Jekyll site:
```bash
bundle exec jekyll serve
```

The site is now accessible at http://localhost:4000.

## Usage

Either download this repository and use it locally or visit the public instance.

### Public Instance

| URL                                                            | Status |
|----------------------------------------------------------------|--------|
| [www.persogenius.de](https://www.persogenius.de)               | ✅      |

## Security

_persogenius.de_ runs locally in your browser, meaning the server does not store or process any personal data. User inputs remain on the device and are not transmitted to the server.

## Credits

- [Die maschinenlesbare Zone in deutschen Ausweisen und Pässen](https://www.bmi.bund.de/SharedDocs/downloads/DE/veroeffentlichungen/themen/moderne-verwaltung/ausweise/maschinenlesbare-zone-paesse-ausweise.pdf?__blob=publicationFile&v=17) [(archived)](https://web.archive.org/web/20241009144007/https://www.bmi.bund.de/SharedDocs/downloads/DE/veroeffentlichungen/themen/moderne-verwaltung/ausweise/maschinenlesbare-zone-paesse-ausweise.pdf?__blob=publicationFile&v=17)