import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
             <div style={{textAlign:'center'}}>
        <p className="copy-footer-28 text-center"> Copyright &copy; 2021 , ABC Choice. All Rights Reserved | Design & Developed by <a
          href="https://10gspectrum.com">10G SPECTRUM</a></p>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
