import React from 'react'
import {Link} from 'react-router-dom';           {/*Replace all a tag with link tag to stop reload  and we write to=(give redirect .js pagecomponent)*/}

export default function Footer() {
    return (
        <div><footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <Link href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"></Link>
                <span className="text-muted">© 2025 Sumit Saha, Inc</span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            </ul>
        </footer></div>
    )
}
