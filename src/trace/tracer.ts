import tracer from 'dd-trace';

// initialized in a different file to avoid hoisting.
tracer.init({
    // https://docs.datadoghq.com/tracing/connect_logs_and_traces/nodejs/
    // appsec: true,
    // logInjection: true,
    // profiling: true,
    // env: 'prod',
    // service: 'armakers',
    // version: '1.0.3',
});
export default tracer;