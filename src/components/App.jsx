import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

import fetchImagesWithQuery from '../api/api';

class App extends Component {
  state = {
    images: [], // null
    isLoading: false,
    error: null,
    searchQ: '',
    pageNumber: 1,
    totalHits: 0,
    imagesPerPage: 0,
    showModal: false,
    currentImgLargeUrl: '',
  };

  // useEffect hook // см 1:53:30 (1ое видео)
  async componentDidUpdate(prevProps, prevState) {
    const { searchQ, pageNumber } = this.state;

    // для ХУКА см конспект useEffect //
    if (this.state.searchQ !== prevState.searchQ) {
      this.setState({ isLoading: true, images: [] }); //
      
      // см 1:53:30 (1ое видео)
      try {
        const result = await fetchImagesWithQuery(searchQ, pageNumber);

        const imagesArr = result.data.hits;
        const totalImages = result.data.totalHits;

        this.setState({
          images: imagesArr,
          pageNumber: 1,
          totalHits: totalImages,
          imagesPerPage: imagesArr.length,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }

    // для ХУКА см конспект useEffect // + см 1:53:00 (1ое видео)
    if (this.state.pageNumber !== prevState.pageNumber) {
      this.setState({ isLoading: true });

      try {
        const result = await fetchImagesWithQuery(searchQ, pageNumber);
        const imagesArr = result.data.hits;

        this.setState(({ images, imagesPerPage }) => ({
          images: [...images, ...imagesArr],
          imagesPerPage: imagesPerPage + imagesArr.length,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
    //
  }

  onSubmitSearchFormHandler = searchWord => {
    this.setState({ searchQ: searchWord });
  };

  onLoadMore = () => {
    this.setState(({ pageNumber }) => ({ pageNumber: pageNumber + 1 }));
  };

  //
  onCurrentImageClick = largeImgURL => {
    this.setState(({ currentImgLargeUrl, showModal }) => ({
      currentImgLargeUrl: largeImgURL,
      showModal: !showModal,
    }));
  };
  //

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const {
      images,
      imagesPerPage,
      totalHits,
      isLoading,
      showModal,
      currentImgLargeUrl,
    } = this.state;

    return (
      <div className="App">
        <Searchbar onFormSubmit={this.onSubmitSearchFormHandler} />

        {images && (
          <ImageGallery images={images} onImgClick={this.onCurrentImageClick} />
        )}

        {isLoading && <Loader />}

        {images && imagesPerPage < totalHits && (
          <Button onLoadMoreBtnClick={this.onLoadMore} />
        )}

        {/* {this.state.totalHits === 0 &&
          this.state.pageNumber === 1 &&
          toast.warn('No pics')} */}

        {showModal && (
          <Modal onClose={this.toggleModal} imgUrl={currentImgLargeUrl} />
        )}

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
}

export default App;
