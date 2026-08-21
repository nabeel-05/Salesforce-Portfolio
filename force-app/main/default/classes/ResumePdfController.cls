public without sharing class ResumePdfController {

    @AuraEnabled
    public static String getResumeBase64(String resumeUrl) {
        if (String.isBlank(resumeUrl)) {
            throw buildException('Resume URL is required.');
        }

        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setTimeout(120000);
        request.setEndpoint(resumeUrl.trim());

        HttpResponse response;

        try {
            response = new Http().send(request);
        } catch (Exception e) {
            throw buildException(
                'Unable to retrieve the resume: ' + e.getMessage()
            );
        }

        if (response.getStatusCode() != 200) {
            throw buildException(
                'Resume request failed with HTTP ' +
                response.getStatusCode() + ': ' +
                response.getStatus()
            );
        }

        Blob fileBlob = response.getBodyAsBlob();

        if (fileBlob == null || fileBlob.size() == 0) {
            throw buildException('The resume file is empty.');
        }

        return EncodingUtil.base64Encode(fileBlob);
    }

    // AuraHandledException does not reliably surface the message passed
    // to its constructor to the client - setMessage() must be called
    // explicitly, or the LWC only ever sees a generic placeholder.
    private static AuraHandledException buildException(String message) {
        AuraHandledException ex = new AuraHandledException(message);
        ex.setMessage(message);
        return ex;
    }
}