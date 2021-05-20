import PropTypes from "prop-types";
import endorse from "../images/icons/endorse.png";
import plus from "../images/icons/plus.png";
import "./Help.scss";

const Help = (props) => {
  Help.propTypes = {
    onRedirect: PropTypes.func
  };

  return (
    <div className="Help">

      <div className="page-title">
        Frequently asked questions
      </div>

      <hr />

      <div className="page-text">

        <div className="qa">
          <div className="question">
            What is Campfire?
          </div>
          <div className="answer">
            <span className="link" onClick={() => props.onRedirect("GitHub")}>Campfire</span> is a Q&A discussion board/forum that allows students and instructors to discuss course-related topics 24/7 in a controlled, moderated environment.

            Special features include:
            <ul>
              <li>Live preview & markdown support for <a href="https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD" rel="noreferrer" target="_blank">200+ languages</a></li>
              <li>Dynamic search by keyword, user name, post title/body, comment body, or post ID (e.g., @123)</li>
              <li>Additional filtering by user-generated, course-specific tags, including by resolved and unresolved status</li>
              <li>Anonymous peer-to-peer contributions (visible only to instructors)</li>
              <li>Engagement-based incentives to encourage student participation and collaboration</li>
              <li>User management, course configuration, and instructor moderation tools</li>
              <li>Profile customization</li>
            </ul>
          </div>
        </div>

        <div className="qa">
          <div className="question">
            How does it work?
          </div>
          <div className="answer">
            Instructors create a course then invite students (and other instructors, if any) via <i>access codes</i>. These codes can be accessed by instructors through the course dashboard. New users can enrol by entering the code through the <span className="link" onClick={() => props.onRedirect("Join")}>Join</span> page.
          </div>
        </div>

        <div className="qa">
          <div className="question">
            What can I do as a student?
          </div>
          <div className="answer">
            Once enrolled, you can immediately start posting questions or participate in <span className="discussions">discussions</span>. Even though there are instructors present to help, you are encouraged to help your peers! If you find a comment you really agree with, you can increase its number of &apos;likes&apos; by pressing the <img src={plus} /> button.
          </div>
        </div>

        <div className="qa">
          <div className="question">
            What can I do as an instructor?
          </div>
          <div className="answer">
            Like students, instructors can post questions, participate in discussions, and &apos;like&apos; comments. As an instructor, your likes will count as <span className="endorsements">endorsements</span>, indicated by a badge <img src={endorse} /> and footnote. This lets students know that an instructor agrees with the answer. For moderation purposes, instructors can also edit/delete student posts and comments, as well as view the identities of anonymous users.
          </div>
        </div>

        <div className="qa">
          <div className="question">
            How do I mark a question as resolved?
          </div>
          <div className="answer">
            Once the author of a post believes that a suitable answer for a question has been provided, the post author can select the comment or reply as the <span className="best">Best Answer</span>. This will mark the post as resolved, though discussions may continue.
          </div>
        </div>

        <div className="qa">
          <div className="question">
            What happens when the course is over?
          </div>
          <div className="answer">
            After a course has ended, the head instructor can mark a course as <span className="archived">archived</span> via the course settings. This indicates that posts will no longer be moderated. The discussion board will still be accessible to all users in case there are any on-going discussions or an answer needs to be referenced later on.
          </div>
        </div>

      </div>

    </div>
  );
};

export default Help;
