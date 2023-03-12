// eslint-disable-next-line import/no-extraneous-dependencies
import MatrixParallax from 'react-matrix-parallax'

const NotFound = () => {
   return (
      <>
         <MatrixParallax color="#00AA00" backgroundColor="rgba(0,0,0,1)">
            <div style={{ fontSize: '1.7rem' }}>
               <h2>404</h2>
               <h5 style={{ maxWidth: '100vw' }}>Page Not Found</h5>
            </div>
         </MatrixParallax>
      </>
   )
}

export default NotFound
