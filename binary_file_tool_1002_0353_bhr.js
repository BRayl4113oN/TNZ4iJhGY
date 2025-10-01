// 代码生成时间: 2025-10-02 03:53:19
 * providing an interface for binary file operations.
 */

const fs = require('fs');
const path = require('path');

// Function to read a binary file and return its content as a Buffer
async function readBinaryFile(filePath) {
  try {
    const data = await fs.promises.readFile(filePath);
    return data;
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
}

// Function to write binary data to a file
async function writeBinaryFile(filePath, data) {
  try {
    await fs.promises.writeFile(filePath, data);
  } catch (error) {
    throw new Error(`Failed to write file: ${error.message}`);
  }
}

// Function to convert a Buffer to a hexadecimal string representation
function bufferToHex(buffer) {
  return Array.from(buffer)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

// Function to convert a hexadecimal string to a Buffer
function hexToBuffer(hex) {
  return Buffer.from(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

// Exporting the module functions for use in other parts of the application
module.exports = {
  readBinaryFile,
  writeBinaryFile,
  bufferToHex,
  hexToBuffer
};