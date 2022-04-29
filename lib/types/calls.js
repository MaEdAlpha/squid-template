"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityBatchAllCall = exports.SystemRemarkCall = void 0;
const assert_1 = __importDefault(require("assert"));
const support_1 = require("./support");
class SystemRemarkCall {
    constructor(ctx) {
        this.ctx = ctx;
        (0, assert_1.default)(this.ctx.extrinsic.name === 'system.remark');
    }
    /**
     *  Make some on-chain remark.
     */
    get isV1020() {
        return this.ctx._chain.getCallHash('system.remark') === 'f4e9b5b7572eeae92978087ece9b4f57cb5cab4f16baf5625bb9ec4a432bad63';
    }
    /**
     *  Make some on-chain remark.
     */
    get asV1020() {
        (0, assert_1.default)(this.isV1020);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    get isLatest() {
        (0, support_1.deprecateLatest)();
        return this.isV1020;
    }
    get asLatest() {
        (0, support_1.deprecateLatest)();
        return this.asV1020;
    }
}
exports.SystemRemarkCall = SystemRemarkCall;
class UtilityBatchAllCall {
    constructor(ctx) {
        this.ctx = ctx;
        (0, assert_1.default)(this.ctx.extrinsic.name === 'utility.batchAll' || this.ctx.extrinsic.name === 'utility.batch_all');
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Trait::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get isV2026() {
        return this.ctx._chain.getCallHash('utility.batch_all') === '0b91bc918785a0daca0f84d0944f67d5ba41d7671a614c7bf32886ae9af4171a';
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Trait::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get asV2026() {
        (0, assert_1.default)(this.isV2026);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get isV2028() {
        return this.ctx._chain.getCallHash('utility.batch_all') === 'c23e90ca476ef71c06ad6f9a977c6a5523017e3107413ee2a3e0203b146b1dbc';
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get asV2028() {
        (0, assert_1.default)(this.isV2028);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get isV2029() {
        return this.ctx._chain.getCallHash('utility.batch_all') === '47cc5e75609d870cf10113d44466fd1fab85525ccf41952bfbedc494337f2ae7';
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get asV2029() {
        (0, assert_1.default)(this.isV2029);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get isV2030() {
        return this.ctx._chain.getCallHash('utility.batch_all') === 'dffb7b951639b9f12cdd7e94b89d5467322839dd732edfdcd6006ef6e404262d';
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get asV2030() {
        (0, assert_1.default)(this.isV2030);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get isV9010() {
        return this.ctx._chain.getCallHash('utility.batch_all') === '9e53139442c8dc044cbafadc4467e51f4ba8cf380fb2e7f52f5a2bf408e39f81';
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get asV9010() {
        (0, assert_1.default)(this.isV9010);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get isV9030() {
        return this.ctx._chain.getCallHash('utility.batch_all') === '1bf102147e2b49de6f05167341e5d4d2d2d97440f232567d03ad5fde59afc7ce';
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get asV9030() {
        (0, assert_1.default)(this.isV9030);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get isV9040() {
        return this.ctx._chain.getCallHash('utility.batch_all') === 'a8f12ed9e1532859077a0714b00e7b9d96c71e0e92e0bc3b8948ba73dd353b6a';
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get asV9040() {
        (0, assert_1.default)(this.isV9040);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get isV9050() {
        return this.ctx._chain.getCallHash('utility.batch_all') === 'cbb350c7588ee75db28497f6205387fed96efd315acf26cb6fe94bebefc3bb69';
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get asV9050() {
        (0, assert_1.default)(this.isV9050);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get isV9080() {
        return this.ctx._chain.getCallHash('utility.batch_all') === '0eda6c0361a101c244a2964a4dec320e503e137f1707dcf3b945bccc1b3ce72e';
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin.
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get asV9080() {
        (0, assert_1.default)(this.isV9080);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *    exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get isV9090() {
        return this.ctx._chain.getCallHash('utility.batch_all') === 'e5cf82d4d7bfa3e9c559cf0b200695f7e23b1dd46aef9948e05cb3c5783e8f20';
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *    exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get asV9090() {
        (0, assert_1.default)(this.isV9090);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *    exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get isV9100() {
        return this.ctx._chain.getCallHash('utility.batch_all') === '34b740013a886928192b7c726cf44d3fd85e0bb0468d5e9c61be1fa84adf1088';
    }
    /**
     *  Send a batch of dispatch calls and atomically execute them.
     *  The whole transaction will rollback and fail if any of the calls failed.
     *
     *  May be called from any origin.
     *
     *  - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *    exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *  If origin is root then call are dispatch without checking origin filter. (This includes
     *  bypassing `frame_system::Config::BaseCallFilter`).
     *
     *  # <weight>
     *  - Complexity: O(C) where C is the number of calls to be batched.
     *  # </weight>
     */
    get asV9100() {
        (0, assert_1.default)(this.isV9100);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     *
     * May be called from any origin.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     *
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get isV9111() {
        return this.ctx._chain.getCallHash('utility.batch_all') === '24d45e7a735cd630cb9f3c7155c2fcfe1b70b4e4ba1d7bb26c8188817b942754';
    }
    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     *
     * May be called from any origin.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     *
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get asV9111() {
        (0, assert_1.default)(this.isV9111);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     *
     * May be called from any origin.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     *
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get isV9122() {
        return this.ctx._chain.getCallHash('utility.batch_all') === '424dc12dcacdf2d18ca16ecfeae1992dd87f3f05f67dab37f0781666c8a40531';
    }
    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     *
     * May be called from any origin.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     *
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get asV9122() {
        (0, assert_1.default)(this.isV9122);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     *
     * May be called from any origin.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     *
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get isV9130() {
        return this.ctx._chain.getCallHash('utility.batch_all') === 'cde63f2d03572d996e17d01bbb60b869ab14d06e4f9f43641c0c5b3e6e142eeb';
    }
    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     *
     * May be called from any origin.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     *
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get asV9130() {
        (0, assert_1.default)(this.isV9130);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     *
     * May be called from any origin.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     *
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get isV9160() {
        return this.ctx._chain.getCallHash('utility.batch_all') === '10fb515c773975eeef05d2d1183adff0de2de1188ccfad4af41c7bc587d1a0b3';
    }
    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     *
     * May be called from any origin.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     *
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get asV9160() {
        (0, assert_1.default)(this.isV9160);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     *
     * May be called from any origin.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     *
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get isV9170() {
        return this.ctx._chain.getCallHash('utility.batch_all') === '685b208ab32dde4f7ecf7fdc0556c2bc4a9f4b8a40d0e1e4e80148abccf4b1a3';
    }
    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     *
     * May be called from any origin.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     *
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get asV9170() {
        (0, assert_1.default)(this.isV9170);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     *
     * May be called from any origin.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     *
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get isV9180() {
        return this.ctx._chain.getCallHash('utility.batch_all') === '45608e6b9d13d71209aafd6f6d0cc4d5059046d1de4f3bbabd04ca4c298ed302';
    }
    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     *
     * May be called from any origin.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     *
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get asV9180() {
        (0, assert_1.default)(this.isV9180);
        return this.ctx._chain.decodeCall(this.ctx.extrinsic);
    }
    get isLatest() {
        (0, support_1.deprecateLatest)();
        return this.isV9180;
    }
    get asLatest() {
        (0, support_1.deprecateLatest)();
        return this.asV9180;
    }
}
exports.UtilityBatchAllCall = UtilityBatchAllCall;
//# sourceMappingURL=calls.js.map