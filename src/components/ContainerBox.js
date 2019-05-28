import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'



const ContainerBox = (props) => {



  return (
    <div
      onDragEnter={props.dragEnter}
      onDragOver={props.dragOver}
      onDrop={props.dragEnd}
      key={props.id}
      className={`${props.className}`} >
      <h2 className="containerTitle"> {props.id}</h2>
      <CSSTransitionGroup component="div"
        className="containerBox"
        transitionName="boxAnimation"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {props.tasks}
      </CSSTransitionGroup>
    </div >
  );
}

export default ContainerBox;