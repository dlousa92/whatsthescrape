import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

const ImageCarousel = (props) => {
  let images = props.images
  let url = props.url

  return (
    <div>
      <h2>There are a total of {images.length} viewable images on {url}.</h2>
      <Carousel>
        {/** For each image create a carousel item */ }
        {images.map(function (img, index) {
          if (!img.src) {
            return
          }

          return (
            <Carousel.Item key={index}>
              <img
                className='d-block w-100'
                src={img.src}
                alt={img.alt}
              />
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  )
}

export default ImageCarousel
