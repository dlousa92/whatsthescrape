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
        <a class='carousel-control-prev' href='#carouselExampleIndicators' role='button' data-slide='prev'>
          <span class='carousel-control-prev-icon' aria-hidden='true' />
          <span class='sr-only'>Previous</span>
        </a>
        <a class='carousel-control-next' href='#carouselExampleIndicators' role='button' data-slide='next'>
          <span class='carousel-control-next-icon' aria-hidden='true' />
          <span class='sr-only'>Next</span>
        </a>
      </Carousel>
      <p className='carousel-text'>There are a total of {images.length} viewable images on {url}</p>
    </div>
  )
}

export default ImageCarousel
