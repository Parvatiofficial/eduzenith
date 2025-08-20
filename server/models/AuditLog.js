const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true
    },
    entity: {
      type: String,
      required: true
    },
    entityId: {
      type: String,
      default: null
    },
    actor: {
      type: String,
      default: 'system'
    },
    ipAddress: {
      type: String,
      default: '127.0.0.1'
    },
    durationMs: {
      type: Number,
      default: 0
    },
    statusCode: {
      type: Number,
      default: 200
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false
  }
);

auditLogSchema.index({ timestamp: -1 });
auditLogSchema.index({ entity: 1, entityId: 1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
