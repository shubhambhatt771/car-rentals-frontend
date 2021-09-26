import Config from "../config/default";
const Card = ({ car }) => {
  console.log(process.env.S3_IMAGE_URL, "value");
  return (
    <div className="card mt-2 mb-2">
      <div className="card-header m-0 p-0">
        <div className="card-img-top">
          <img
            src={`${Config.s3_url}/${car.galleries[0]}`}
            className="image-fluid"
            style={{ width: "100%", height: "100%" }}
            alt="logo"
          />
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <label>Model</label>
          <span>{car.model}</span>
        </div>
        <div className="d-flex justify-content-between">
          <label>Body</label>
          <span>{car.body_type}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
