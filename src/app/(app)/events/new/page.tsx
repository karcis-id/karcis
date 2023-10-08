import { NextPage } from "next"

const CreateEvent: NextPage = async () => {
  // TODO: handle stages using url query params
  return (
    <>
      <p>create new event</p>
      <form>
        <div className="[&_label]:block">
          <strong>step 1:</strong>
          <label htmlFor="name">event name</label>
          <input id="name" />
          <label htmlFor="description">event description</label>
          <input id="description" />
          <label htmlFor="location">location</label>
          <input id="location" />
          <label htmlFor="datetime">date & time</label>
          <input id="datetime" />
        </div>
        <div className="[&_label]:block">
          <strong>step 2:</strong>
          <label htmlFor="subject">subject heading</label>
          <input id="subject" />
          <label htmlFor="template">message body</label>
          <div>
            <p>message variables</p>
            <ul>
              <li>{"{{ email }} -> email of participant"}</li>
              <li>{"{{ name }} -> name of participant"}</li>
            </ul>
          </div>
          <textarea id="template" />
        </div>
        <div className="[&_label]:block">
          <strong>step 3:</strong>
          <label htmlFor="data-file">upload participant data</label>
          <input id="data-file" type="file" />
        </div>
        <div className="[&_label]:block">
          <strong>step 4:</strong>
          <p>review information</p>
          <p>{"1000 participant * rp 5,000,000 -> rp 5,000,000,000"}</p>
          <button type="submit">confirm payment</button>
        </div>
      </form>
    </>
  )
}

export default CreateEvent
