import API from './';

export interface ISupportTicket {
  ticketType: number;
  subject: string;
  issue: string;
}

const SupportTicketService = {
  createSupportTicket(orderId: string, data: ISupportTicket) {
    return API({
      url: `/api/SupportTicket/Submit/${orderId}`,
      data,
      method: 'POST',
    });
  },
};

export default SupportTicketService;
