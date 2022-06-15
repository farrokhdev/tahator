export const ucfirst = (str: string) => {
  if (!str) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (inputContent: string, numWords: number) => {
  if (!inputContent) {
    return '';
  }
  const limit = !numWords ? 100 : numWords;

  // Trim whitespace
  let content: any = inputContent.trim();

  // Convert the content into an array of words
  const contentArr = content.split(' ');

  // Remove any words above the limit
  content = contentArr.slice(0, limit);

  // Convert the array of words back into a string
  return `${content.join(' ')}${contentArr.length > limit ? '…' : ''}`;
};

export const stripHtml = (str: string) => {
  let returnString = str;

  // Remove DOM tags
  returnString = returnString.replace(/<[^>]*>?/gm, '');

  // Remove entities
  const entities = [
    ['amp', '&'],
    ['apos', "'"],
    ['#x27', "'"],
    ['#x2F', '/'],
    ['#39', "'"],
    ['#47', '/'],
    ['lt', '<'],
    ['gt', '>'],
    ['nbsp', ' '],
    ['quot', '"'],
    ['hellip', '...'],
    ['#8217', "'"],
    ['#8230', '...'],
    ['#8211', '-'],
  ];

  entities.map((item) => {
    returnString = returnString.replace(new RegExp(`&${item[0]};`, 'g'), item[1]);
  });

  return returnString;
};
