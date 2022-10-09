module.exports={
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    dbFile: process.env.DB_FILE,
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    },
    aws:{
        bucket:process.env.S3_BUCKET,
        access:process.env.AWS_ACCESS_KEY,
        secret:process.env.AWS_SECRET_ACCESS_KEY
    }
};
