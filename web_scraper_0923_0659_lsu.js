// 代码生成时间: 2025-09-23 06:59:00
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

/**
 * Class for scraping web content
 */
class WebScraper {
  /**
   * Constructor for WebScraper
   * @param {string} url - The URL to scrape
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * Fetches the content from the provided URL
   * @returns {Promise<string>} - The HTML content of the page
   */
  async fetchContent() {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      console.error('Error fetching content:', error);
      throw error;
    }
  }

  /**
   * Scrapes specific data from the HTML content
   * @param {string} selector - The CSS selector to target the data
   * @returns {Promise<string[]>} - An array of data scraped from the page
   */
  async scrapeData(selector) {
    try {
      const html = await this.fetchContent();
      const $ = cheerio.load(html);
      const data = [];
      $(selector).each((index, element) => {
        data.push($(element).text().trim());
      });
      return data;
    } catch (error) {
      console.error('Error scraping data:', error);
      throw error;
    }
  }

  /**
   * Saves the scraped data to a file
   * @param {string[]} data - The data to save
   * @param {string} filename - The name of the file to save the data in
   */
  saveDataToFile(data, filename) {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (error) => {
      if (error) {
        console.error('Error writing file:', error);
      } else {
        console.log(`Data successfully saved to ${filename}`);
      }
    });
  }
}

// Example usage:
(async () => {
  const scraper = new WebScraper('https://example.com');
  try {
    const data = await scraper.scrapeData('selector-to-scrape');
    scraper.saveDataToFile(data, 'scraped_data.json');
  } catch (error) {
    console.error('An error occurred during the scraping process:', error);
  }
})();
    