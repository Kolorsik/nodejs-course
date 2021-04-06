const TYPES = {
    MongoDBClient: Symbol.for('MongoDBClient'),
    UserService: Symbol.for('UserService'),
    PostService: Symbol.for('PostService'),
    CommentService: Symbol.for('CommentService')
};

export default TYPES;
