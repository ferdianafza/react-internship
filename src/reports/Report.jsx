import React from "react";
import axios from "axios";

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      product: "",
      name: "",
      description: "",
      price: "",
      size: "",
      color: "",
      inStock: ""
    };
  }

  componentDidMount() {
    const { match: {params: { id } } } = this.props;

    axios.get(`https://mystore41.herokuapp.com/api/products/${id}`)
      .then(res => {
        console.log(res.data.data);
        this.setState({product: res.data.data.attributes});
        this.setState({name : res.data.data.attributes.name});
        this.setState({color : res.data.data.attributes.color});
        this.setState({description : res.data.data.attributes.description});
        this.setState({price : res.data.data.attributes.price});
        this.setState({size : res.data.data.attributes.size});
        this.setState({inStock : res.data.data.attributes.inStock});
        this.setState({images : res.data.data.attributes.images});

      })
  }



render() {
    const { images, name, color, description, price, size, inStock } = this.state;
    return (
      <div className="">
        <p>
          <label>
            Product Name : {name}
          </label>
        </p>
        <p>
          <label>
            Description : {description}
          </label>
        </p>
        <p>
          <label>
            Size : {size}
          </label>
        </p>
        <p>
          <label>
            Color : {color}
          </label>
        </p>
        <p>
          <label>
            Stock : {inStock}
          </label>
        </p>
        <p>
          <label>
            Price : {price}
          </label>
        </p>
        {images.map(image =>
            // <p>{image.fileName}</p>
            <img width="500" heigth="400" src={image.imageUrl} />
            )}
      </div>
    );
  }
}