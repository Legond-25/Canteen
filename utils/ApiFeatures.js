class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1.) Basic Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['sort', 'page', 'limit'];

    excludedFields.forEach((field) => {
      delete queryObj[field];
    });

    // 2.) Advanced Filtering
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => {
        return `$${match}`;
      }
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
}

module.exports = APIFeatures;
