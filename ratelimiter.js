class RateLimiter {
    constructor() {
        this.bucketSize = 4;
        this.refillRate = 4 * 60 * 1000 //minutes. convert to seconds
        this.bucket = new Array(this.bucketSize).fill(1);
    }

    tokenBucketAlgorithm(req) {
        if (req) {
            //check if the bucket is empty
            if (this.bucket.length === 0) {
                throw new Error('Request limit exceeded. Status Code 429.')
            }

            //loop through the bucket, remove one token for the incoming request. end
            this.bucket.pop();
            return 200;
        }
    }

    refillBucket() {
        //every 4 seconds refill the bucket
        if (this.bucket.length < this.bucketSize) {
            this.bucket.push(1);
        }
        setInterval(() => this.refillBucket(), this.refillRate);
    }
}

const rate = new RateLimiter();
let requestObj;
while (true) {
    rate.tokenBucketAlgorithm(requestObj);
}

