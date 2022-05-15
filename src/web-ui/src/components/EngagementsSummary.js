import React from "react";
import {Col, Row, Table} from "react-bootstrap";

const filterAndSortEmotions = (face) =>
  Object.keys(face.emotions)
    .map((emotion) => ({
      emotion,
      confidence: face.emotions[emotion],
    }))
    .filter((x) => x.confidence > 0)
    .sort((a, b) => {
      if (a.confidence > b.confidence) {
        return -1;
      } else if (a.confidence < b.confidence) {
        return 1;
      } else return 0;
    });

const displayEmotion = (emotion) => {

  switch( emotion ) {
    case 'ANGRY' :
      return "😠 Colère"
    case 'CALM' :
      return "😎 Calme"
    case 'CONFUSED' :
      return "🤨 Confus"
    case 'DIGUSTED' :
      return "🤮 Dégoût"
    case 'FEAR' :
      return "😱 Peur"
    case 'HAPPY' :
      return "😀 Joyeux"
    case 'SAD' :
      return "🥺 Tristesse"
    case 'SURPRISED' :
      return "😮 Surprise"
    default:
      return "Non identifié"
  }

}

const EngagementsSummary = ({
  detectedFaces,
  detectedPeople,
  showFaceBoundingBoxes,
  webcamCoordinates,
}) => (
  <Row>
    {detectedFaces.map((face, index) => (
      <Col md={4} key={index}>
        {showFaceBoundingBoxes && (
          <div
            style={{
              border: "1px solid #f0ad4e",
              fontWeight: "bold",
              position: "fixed",
              height: webcamCoordinates.height * face.boundingBox.Height,
              left:
                webcamCoordinates.left +
                face.boundingBox.Left * webcamCoordinates.width,
              top:
                webcamCoordinates.top +
                face.boundingBox.Top * webcamCoordinates.height,
              width: webcamCoordinates.width * face.boundingBox.Width,
            }}
          >
            Personne #{index + 1}
          </div>
        )}
        <Table responsive style={{fontsize: "20px"}}>
          <thead>
            <tr>
              <th className={"bigtext"}>Personne #{index + 1}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={"textemotion"}>Age</td>
              <td className={"textemotion"}>
                {face.ageLow} - {face.ageHigh} ans
              </td>
            </tr>
            {filterAndSortEmotions(face).map(({ emotion, confidence }) => (
              <tr key={emotion}>
                <td className={"textemotion"}>{displayEmotion(emotion)}</td>
                <td className={"textemotion"}>{confidence}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    ))}
    {detectedPeople.map((person) => (
      <p key={person.externalImageId}>
        Welcome <b>{person.memberName}</b> ({person.jobTitle})
      </p>
    ))}
  </Row>
);

export default EngagementsSummary;
