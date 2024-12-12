import anchorzUpLogo from "../assets/images/anchorz-up-logo.svg";
import deleteIcon from "../assets/images/delete-icon.png";
import qrCodeIcon from "../assets/images/qr-icon.png";
import PropTypes from "prop-types";
import "../assets/styles/navbar.css";
import { Fragment, useState } from "react";
import DeleteModal from "./DeleteModal";
import QrModal from "./QrModal";
import Button from "./Button";

const Navbar = ({ shortenedUrls }) => {
  const [showDelete, setShowDelete] = useState(null);
  const [qrCode, setQrCode] = useState({
    value: null,
    shortCode: null,
  });

  const handleShowDelete = (id) => {
    setShowDelete((previous) => (previous === id ? null : id));
  };

  const handleCancelDelete = () => {
    setShowDelete(null);
  };
  const handleCloseQrModal = () => {
    setQrCode({ value: null, shortCode: null });
  };

  const handleDeleteUrl = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/deleteUrl/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await response.json();
      setShowDelete(null);
    } catch (error) {
      console.error("Error deleting url:", error.message);
    }
  };
  const handleGenerateQrCode = async (shortCode) => {
    try {
      const response = await fetch(
        `http://localhost:8080/generateQr/${shortCode}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const qrCodeUrl = await response.text();
      setQrCode({
        value: qrCodeUrl,
        shortCode: shortCode,
      });
    } catch (error) {
      console.error("Error deleting url:", error.message);
    }
  };

  const listElement = shortenedUrls.map((item) => {
    return (
      <Fragment key={item.id}>
        <li className="shortenedUrl">
          <div className="listElementUrl">
            <a
              href={`http://localhost:8080/${item.short_code}`}
              target="_blank"
            >{`http://localhost:8080/${item.short_code}`}</a>
            <Button onButtonClick={() => handleShowDelete(item.id)}>
              <img className="buttonIcon" src={deleteIcon} alt="deleteIcon" />
            </Button>
            <Button onButtonClick={() => handleGenerateQrCode(item.short_code)}>
              <img className="buttonIcon" src={qrCodeIcon} alt="" />
            </Button>
          </div>
          {item.click_count > 0 && (
            <p className="clickCount">
              This link has been clicket {item.click_count} times
            </p>
          )}
          {showDelete === item.id && (
            <DeleteModal
              onHandleDelete={() => handleDeleteUrl(item.id)}
              onCancelDelete={handleCancelDelete}
              url={`http://localhost:8080/${item.short_code}`}
            />
          )}
          {qrCode.shortCode === item.short_code && (
            <QrModal
              qrCodeValue={qrCode.value}
              qrUrl={item.short_code}
              onCloseModal={handleCloseQrModal}
            />
          )}
        </li>
      </Fragment>
    );
  });

  return (
    <nav className="navbar">
      <img className="logo" src={anchorzUpLogo} alt="" />
      <div className="shortenedUrlContainer">
        <h3>My Shortened URLs</h3>
        <ul className="shortenedUrlList">{listElement}</ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  shortenedUrls: PropTypes.array,
  onGetUrls: PropTypes.func,
};
export default Navbar;
