var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb',
{
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false
}
);

var conn=mongoose.connection;

const blogSchema = new mongoose.Schema({ 
    
    name: { type: String },

    company: {type: String },

    designation: { type: String },

    phone_no: { type: String },

    email: { type: String },

    address: { type: String },

    year_of_establishment: { type: String },
    
    description: { type: String },

    product_name: { type: String},

    product_desc: { type: String},
    
    avtar: [String],

    timeCreated: { type: Date, default: () => Date.now()},
    
});

var BlogSchema = mongoose.model('BlogSchema',blogSchema);

module.exports=BlogSchema;