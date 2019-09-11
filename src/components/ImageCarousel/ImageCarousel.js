import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import './imagecarousel.scss'

const ImageCarousel = (props) => {
  let images = props.images
  let url = props.url

  return (
    <div className='carousel'>
      <Carousel className='carousel-wrapper'>
        {/** For each image create a carousel item */ }
        {images.map(function (img, index) {
          // If src is undefined, early return
          if (!img.src) {
            return
          }

          return (
            <Carousel.Item key={index}>
              <img
                className='d-block carousel-img'
                src={img.src}
                alt={img.alt}
              />
            </Carousel.Item>
          )
        })}
      </Carousel>
      <p className='carousel-text'>There are a total of {images.length} viewable images on {url}.</p>
    </div>
  )
}

export default ImageCarousel
