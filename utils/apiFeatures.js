class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    
    filter() {
        const queryObj = {...this.queryString};
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);

        // console.log(req.query, queryObj); // Express parse the query string into a well-formatted object
        
        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|let|lt)\b/g, match => `$${match}`);
        // console.log(JSON.parse(queryStr));
        
        //let query = Tour.find(JSON.parse(queryStr));
        this.query.find(JSON.parse(queryStr));
        
        return this;
    }

    sort() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            // console.log(sortBy);
            this.query = this.query.sort(sortBy);
            // sort('price ratingAverage')
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields() {
        if (this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v'); // exclude __v field
        }

        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 20;
        const skip = (page - 1) * limit;

        // page=2&limit=10, 1-10, page 1, 11-20, page 2, 21-30, page 3...
        this.query = this.query.skip(skip).limit(limit);
        
        // In case user filter a page number out of range
        // if (this.queryString.page) {
        //     const numTours = await Tour.countDocuments();
        //     if(skip >= numTours) throw new Error('This page does not exist!');
        // }

        return this;
    }
}

module.exports = APIFeatures;