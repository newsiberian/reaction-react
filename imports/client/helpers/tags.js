import { ReactionCore } from "meteor/reactioncommerce:core";

export const getSubTags = parentTag => {
  if (Array.isArray(parentTag.relatedTagIds)) {
    const tags = ReactionCore.Collections.Tags.find({
      isTopLevel: false,
      _id: {
        $in: parentTag.relatedTagIds
      }
    }).fetch();

    return parentTag.relatedTagIds.map(tagId => tags.find(tag => tag._id === tagId));
  }

  return [];
};
