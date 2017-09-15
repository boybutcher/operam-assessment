# Operam Assessment/Scraper
### Developed by [Bryan Nguyen](https://www.linkedin.com/in/bqnguyen1/)

A NodeJS based scraper that scrapes the tree [here](http://imagenet.stanford.edu/synset?wnid=n02486410). 

## Getting Started

```sh
git clone https://github.com/boybutcher/operam-assessment.git
cd operam-assessment

npm install
cd client
npm install
cd ..

npm start
```

## Usage Guide (as of 9/15/2017)

Upon launch, the client will automatically fetch from the datase.

If the database is empty, click the 'Scrape Page' button in the control panel on the left.
Currently, scraping is non-blocking and doesn't offer user feedback so you'll have to wait until it's done. In your console, you'll see messages for how many items is parsed.

When you want to view the scraped data as a rendered tree, click the 'Fetch Tree' button.
You can click each individual node to expand them, similar to a file system.

If you want to clear your database at any given time, click the 'Clear Database' button on the left. The button will be disabled if the database is already empty.

## Planned Updates

[ ] user feedback when scraping, add a contextual load page
[ ] clean up Loading component
[ ] throttle request rate from scraping function
