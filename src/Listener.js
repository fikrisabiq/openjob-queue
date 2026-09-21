class Listener {
  constructor(appsService, mailSender) {
    this._appsService = appsService;
    this._mailSender = mailSender;
   this.listen = this.listen.bind(this);
  }
  async listen(message) {
    try {
      const { application_id } = JSON.parse(message.content.toString());
     
      const app = await this._appsService.getApps(application_id);
      
      const result = await this._mailSender.sendEmail(app.target_email, app);
     console.log(result);
    } catch (error) {
     console.error(error);
    }
  }
}
export default Listener;