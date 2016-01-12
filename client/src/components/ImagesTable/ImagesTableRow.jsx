import React from 'react';
import ImageActions from './ImagesTableActions';

export default (props) => {
  let { image } = props;
  return (
    <tr className="image-row">
      <td className="image-cell__aliases">{ image.friendlyAliases }</td>
      <td className="image-cell__description">{ image.properties.description }</td>
      <td className="image-cell__size">{ image.sizeFriendly }</td>
      <td className="image-cell__created-at">{ image.createdAtFriendly }</td>
      <td className="image-cell__actions">
        <ImageActions image={image} />
      </td>
    </tr>
  );
};
