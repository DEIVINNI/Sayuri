export default (text, maxLen = 503) => (text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text);
