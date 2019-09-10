import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

const ImageCarousel = (props) => {
  let images = props.images
  let url = props.url

  console.log(images)

  return (
    <div>
      <h2>There are a total of {images.length} viewable images on {url}.</h2>
      <Carousel>
        {images.map(function (img, index) {
          if (img.src.length === 0) {
            return
          }

          return (
            <Carousel.Item key={index}>
              <img
                className='d-block w-100'
                src={img.src}
                alt={img.alt}
              />
              <Carousel.Caption>
                <p>{img.alt}</p>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  )
}

export default ImageCarousel
