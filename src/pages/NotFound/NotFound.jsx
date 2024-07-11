import NotFoundImg from '../../assets/404.gif'

const NotFound = () => {
    return (
        <div className='grid place-items-center'>
            <img src={NotFoundImg} alt="" />
        </div>
    );
};

export default NotFound;