import fs from "node:fs";
import path from "node:path";

import { ids } from "../util/botOptions.js";

const __filename = "commissions.json";
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "data", __filename);

const commission_channel = ids.commissions_channel;

let jsonData = {};

// Load the JSON file
export function loadJSON() {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "{}");

  const data = fs.readFileSync(filePath, "utf-8");

  jsonData = JSON.parse(data);
}

export function saveJSON() {
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
  console.log(`Saved ${__filename}`);
}

export async function storeCommission(messageId, threadId) {
  if (!jsonData[commission_channel]) {
    jsonData[commission_channel] = [];
  }

  jsonData[commission_channel].push({
    commission_message: messageId,
    thread: threadId,
  });

  scheduleSave();
}

export function getCommissions() {
  return jsonData[commission_channel] || [];
}

export function findCommissionByMessage(messageId) {
  return (jsonData[commission_channel] || []).find(
    (entry) => entry.commission_message === messageId
  );
}

export function removeCommission(messageId) {
  if (!jsonData[commission_channel]) return;

  jsonData[commission_channel] = jsonData[commission_channel].filter(
    (entry) => entry.commission_message !== messageId
  );

  if (jsonData[commission_channel].length === 0)
    delete jsonData[commission_channel];

  scheduleSave();
}

let saveTimeout;
function scheduleSave(delay = 2000) {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveJSON, delay);
}
