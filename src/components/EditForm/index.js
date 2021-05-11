import PropTypes from "prop-types";

import Preview from "./Preview";
import TextForm from "./TextForm";
import Checkbox from "./Checkbox";
import TagForm from "./TagForm";
import Confirmation from "./Confirmation";

const EditForm = (props) => {

  EditForm.propTypes = {

    title: PropTypes.string,
    author: PropTypes.string,
    anonymous: PropTypes.string,
    body: PropTypes.string,
    tags: PropTypes.array,
    courseTags: PropTypes.string,

    onSave: PropTypes.func,
    onCancel: PropTypes.func

  };

  return (
    <div className="EditForm">

    </div>
  )
}

export default EditForm
