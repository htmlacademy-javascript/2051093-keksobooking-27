const DEFAULT_VALUE = 'any';
const mapFilters = document.querySelector('.map__filters');
const MAX_ADVERTS = 10;

const priceRules = {
  'low': {
    min: 0,
    max: 10000
  },
  'middle': {
    min: 10000,
    max: 50000
  },
  'high': {
    min: 50000,
    max: 100000
  },
};

const filters = Array.from(mapFilters.children);
const filterRules = {
  'housing-type': (data, filter) => filter.value === data.offer.type,
  'housing-price': (data, filter) => data.offer.price >= priceRules[filter.value].min && data.offer.price < priceRules[filter.value].max,
  'housing-rooms': (data, filter) => +filter.value === data.offer.rooms,
  'housing-guests': (data, filter) => +filter.value === data.offer.guests,
  'housing-features': (data, filter) => {
    const checkedElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));
    return data.offer.features ? checkedElements.every((checkbox) => data.offer.features.includes(checkbox.value)) : true;
  }
};

const filterData = (data) => {
  const filteredData = [];
  let i = 0;
  let result;

  while (i < data.length && filteredData.length < MAX_ADVERTS) {
    result = filters.every((filter) => (filter.value === DEFAULT_VALUE) ? true : filterRules[filter.id](data[i], filter));

    if (result) {
      filteredData.push(data[i]);
    }

    i++;
  }

  return filteredData;
};

export {mapFilters, filterData};
