const smartgrid = require('smart-grid');

const settings = {
    filename: '_smart-grid',
    outputStyle: 'scss',
    columns: 12,
    offset: '20px',
    container: {
        maxWidth: '1180px',
        fields: '10px'
    },
    breakPoints: {
        lg: {
            width: "1140px",
            fields: "10px"
        },
        md: {
            width: "960px",
            fields: "10px"
        },
        sm: {
            width: "720px",
            fields: "10px"
        },
        xs: {
            width: "540px",
            fields: "10px"
        }
    },
    oldSizeStyle: false,
    properties: [
    ]
};

smartgrid('./app/scss', settings);