import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cardImage } from "../../decks/getCards";
import { Menu, MenuItem, Modal, Box } from "@mui/material";
import CardMUI from "@mui/material/Card";
import Card from "../hand/Card";
import { addToHandFromCemetary, setCurrentCard } from "../../redux/CardSlice";
// import cardback from "../../assets/cardbacks/sleeve_5010011.png";

const img = require("../../assets/pin_bellringer_angel.png");

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   backgroundColor: "rgba(0, 0, 0, 1)",
  //   backgroundColor: "rgba(0, 0, 0, 0.7)",
  //   backgroundColor: "rgba(255, 255, 255, 0.1)",
  backgroundColor: "transparent",
  boxShadow: 24,
  p: 3,
  width: "55%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function Cemetary({
  setHovering,
  setReadyFromCemetary,
  setReady,
  ready,
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contextMenu, setContextMenu] = React.useState(null);
  const reduxCemetary = useSelector((state) => state.card.cemetary);
  const handleModalOpen = () => {
    if (reduxCemetary.length > 0 && !ready) setOpen(true);
  };
  const handleModalClose = () => setOpen(false);
  const dispatch = useDispatch();

  const handleContextMenu = (event, name) => {
    setName(name);
    dispatch(setCurrentCard(name));
    console.log(name);
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleCardToFieldFromCementary = () => {
    handleModalClose();
    handleClose();
    setReady(true);
    setReadyFromCemetary(true);
  };

  const handleCardToHandFromCemetary = () => {
    handleModalClose();
    handleClose();
    dispatch(addToHandFromCemetary(name));
  };

  //   useEffect(() => {
  //     console.log(reduxCemetary);
  //   }, [reduxCemetary]);

  return (
    <>
      <div
        onClick={handleModalOpen}
        style={{
          height: "160px",
          width: "115px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          cursor: `url(${img}) 55 55, auto`,
        }}
      >
        {reduxCemetary && reduxCemetary.length > 0 && (
          <img
            height={"160px"}
            src={cardImage(reduxCemetary[0])}
            alt={"cardback"}
          />
        )}
      </div>

      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CardMUI
            sx={{
              //   backgroundColor: "rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              //   backgroundColor: "black",
              minHeight: "250px",
              padding: "3%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
            variant="outlined"
          >
            {reduxCemetary.map((card, idx) => (
              <div
                key={`card-${idx}`}
                onContextMenu={(e) => {
                  handleContextMenu(e, card);
                }}
              >
                <Card
                  //   key={`card-${idx}`}
                  name={card}
                  setHovering={setHovering}
                />
              </div>
            ))}
          </CardMUI>
        </Box>
      </Modal>

      {reduxCemetary.length > 0 && (
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY - 120, left: contextMenu.mouseX - 35 }
              : undefined
          }
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleCardToHandFromCemetary}>Hand</MenuItem>
          <MenuItem onClick={handleCardToFieldFromCementary}>Field</MenuItem>
        </Menu>
      )}
    </>
  );
}