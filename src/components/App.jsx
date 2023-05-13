// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

import fetchImagesWithQuery from '../api/api';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQ, setSearchQ] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [imagesPerPage, setImagesPerPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [currentImgLargeUrl, setCurrentImgLargeUrl] = useState('');

  useEffect(() => {
    if (searchQ) {
      fetchImages();
    }

    async function fetchImages() {
      setIsLoading(true);

      try {
        const result = await fetchImagesWithQuery(searchQ, pageNumber);
        const imagesArr = result.data.hits;
        const totalImages = result.data.totalHits;

        setImages(prevState => [...prevState, ...imagesArr]);
        setTotalHits(totalImages);
        setImagesPerPage(prevState => prevState + imagesArr.length); //
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [pageNumber, searchQ]);

  const onSubmitSearchFormHandler = searchWord => {
    setSearchQ(searchWord);
    //
    setImages([]);
    //
  };

  const onLoadMore = () => {
    setPageNumber(prevState => prevState + 1);
  };

  const onCurrentImageClick = largeImgURL => {
    setCurrentImgLargeUrl(largeImgURL);
    setShowModal(prevState => !prevState);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <div className="App">
      <Searchbar onFormSubmit={onSubmitSearchFormHandler} />

      {images && (
        <ImageGallery images={images} onImgClick={onCurrentImageClick} />
      )}

      {isLoading && <Loader />}

      {images && imagesPerPage < totalHits && (
        <Button onLoadMoreBtnClick={onLoadMore} />
      )}

      {/* {this.state.totalHits === 0 &&
          this.state.pageNumber === 1 &&
          toast.warn('No pics')} */}

      {showModal && <Modal onClose={toggleModal} imgUrl={currentImgLargeUrl} />}

      <ToastContainer
        autoClose={3000}
        position="top-center"
        pauseOnFocusLoss
        draggable
        newestOnTop
      />
    </div>
  );
}

export default App;



//CLASS component

// class App extends Component {
//   state = {
//     images: [], // null
//     isLoading: false,
//     error: null,
//     searchQ: '',
//     pageNumber: 1,
//     totalHits: 0,
//     imagesPerPage: 0,
//     showModal: false,
//     currentImgLargeUrl: '',
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { searchQ, pageNumber } = this.state;
//
//     if (this.state.searchQ !== prevState.searchQ) {
//       this.setState({ isLoading: true, images: [] }); //

//       try {
//         const result = await fetchImagesWithQuery(searchQ, pageNumber);

//         const imagesArr = result.data.hits;
//         const totalImages = result.data.totalHits;

//         this.setState({
//           images: imagesArr,
//           pageNumber: 1,
//           totalHits: totalImages,
//           imagesPerPage: imagesArr.length,
//         });
//       } catch (error) {
//         this.setState({ error });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }

//     if (this.state.pageNumber !== prevState.pageNumber) {
//       this.setState({ isLoading: true });

//       try {
//         const result = await fetchImagesWithQuery(searchQ, pageNumber);
//         const imagesArr = result.data.hits;

//         this.setState(({ images, imagesPerPage }) => ({
//           images: [...images, ...imagesArr],
//           imagesPerPage: imagesPerPage + imagesArr.length,
//         }));
//       } catch (error) {
//         this.setState({ error });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//     //
//   }

//   onSubmitSearchFormHandler = searchWord => {
//     this.setState({ searchQ: searchWord });
//   };

//   onLoadMore = () => {
//     this.setState(({ pageNumber }) => ({ pageNumber: pageNumber + 1 }));
//   };

//   //
//   onCurrentImageClick = largeImgURL => {
//     this.setState(({ currentImgLargeUrl, showModal }) => ({
//       currentImgLargeUrl: largeImgURL,
//       showModal: !showModal,
//     }));
//   };
//   //

//   toggleModal = () => {
//     this.setState(prevState => ({
//       showModal: !prevState.showModal,
//     }));
//   };

//   render() {
//     const {
//       images,
//       imagesPerPage,
//       totalHits,
//       isLoading,
//       showModal,
//       currentImgLargeUrl,
//     } = this.state;

//     return (
//       <div className="App">
//         <Searchbar onFormSubmit={this.onSubmitSearchFormHandler} />

//         {images && (
//           <ImageGallery images={images} onImgClick={this.onCurrentImageClick} />
//         )}

//         {isLoading && <Loader />}

//         {images && imagesPerPage < totalHits && (
//           <Button onLoadMoreBtnClick={this.onLoadMore} />
//         )}

//         {/* {this.state.totalHits === 0 &&
//           this.state.pageNumber === 1 &&
//           toast.warn('No pics')} */}

//         {showModal && (
//           <Modal onClose={this.toggleModal} imgUrl={currentImgLargeUrl} />
//         )}

//         <ToastContainer
//           autoClose={3000}
//           position="top-center"
//           pauseOnFocusLoss
//           draggable
//           newestOnTop
//         />
//       </div>
//     );
//   }
// }

// export default App;
