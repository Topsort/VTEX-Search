import { defaultFieldResolver, GraphQLField } from "graphql";
import { SchemaDirectiveVisitor } from "graphql-tools";

export class WithSegment extends SchemaDirectiveVisitor {
  /**
   * Get SegmentData from Segment client and put it into the Query
   * Arguments as `segment`.
   *
   * @param {GraphQLField<any, any>} field Field being resolved.
   * @memberof WithSegment
   */
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async (root, args, ctx: Context, info) => {
      const { segment } = ctx.clients;
      const segmentData = await segment.getSegment();

      return resolve(root, { ...args, segment: segmentData }, ctx, info);
    };
  }
}
