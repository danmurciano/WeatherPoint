import ReactLoading from 'react-loading';

export default function AppLoading() {
    return (
      <div className="container-fluid loading-image">
        <div className="app-loading">
          <img className="home-image-loading"/>
          <p> Connecting </p>
          <ReactLoading type="bubbles" color="#37b6bf" height={'12.5%'} width={'12.5%'} className="AppLoading" />
        </div>
      </div>       
    );
}