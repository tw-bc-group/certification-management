import {environment} from '../../environments/environment';
import {CertificateLevel, CertificateType, NonLinkedCertificateLevel} from '../models/certificate.model';

export interface ICertificationColorPair {
  baseColor: string;
  radiaGradientColor: string;
}

type ICertificationColorDict = {
  readonly [level in CertificateLevel | NonLinkedCertificateLevel]: ICertificationColorPair
};

type ICertificationColors = {
  readonly [type in CertificateType]: ICertificationColorDict
};

export const certificationColors: ICertificationColors = {
  [CertificateType.Thoughtworks]: {
    [CertificateLevel.ASSOCIATE_AGILE_COACH]: {
      baseColor: '#F6A559', radiaGradientColor: '#F38C48'
    },
    [CertificateLevel.PROFESSIONAL_AGILE_COACH]: {
      baseColor: '#F6A559', radiaGradientColor: '#F38C48'
    },
    [CertificateLevel.SENIOR_PROFESSIONAL_AGILE_COACH]: {
      baseColor: '#F66F44', radiaGradientColor: '#EB5627'
    },
    [CertificateLevel.MASTER_AGILE_COACH]: {
      baseColor: '#F25248', radiaGradientColor: '#DC3A30'
    },
    [NonLinkedCertificateLevel.AGILE_COACH]: {
      baseColor: '#F68548', radiaGradientColor: '#F68548'
    },
    [NonLinkedCertificateLevel.JUNIOR_AGILE_COACH]: {
      baseColor: '#F68548', radiaGradientColor: '#F68548'
    },
    [NonLinkedCertificateLevel.TRAINEE_AGILE_COACH]: {
      baseColor: '#F68548', radiaGradientColor: '#F68548'
    }
  },
  [CertificateType.Community]: {
    [CertificateLevel.ASSOCIATE_AGILE_COACH]: {
      baseColor: '#F6A559', radiaGradientColor: '#F38C48'
    },
    [CertificateLevel.PROFESSIONAL_AGILE_COACH]: {
      baseColor: '#9CC8AD', radiaGradientColor: '#9CC8AD'
    },
    [CertificateLevel.SENIOR_PROFESSIONAL_AGILE_COACH]: {
      baseColor: '#40BDB1', radiaGradientColor: '#1A9F93'
    },
    [CertificateLevel.MASTER_AGILE_COACH]: {
      baseColor: '#138671', radiaGradientColor: '#214E44'
    },
    [NonLinkedCertificateLevel.AGILE_COACH]: {
      baseColor: '#F68548', radiaGradientColor: '#F68548'
    },
    [NonLinkedCertificateLevel.JUNIOR_AGILE_COACH]: {
      baseColor: '#F68548', radiaGradientColor: '#F68548'
    },
    [NonLinkedCertificateLevel.TRAINEE_AGILE_COACH]: {
      baseColor: '#F68548', radiaGradientColor: '#F68548'
    }
  },
  [CertificateType.Enterprise]: {
    [CertificateLevel.ASSOCIATE_AGILE_COACH]: {
      baseColor: '#F6A559', radiaGradientColor: '#F38C48'
    },
    [CertificateLevel.PROFESSIONAL_AGILE_COACH]: {
      baseColor: '#CEAFE2', radiaGradientColor: '#B397CC'
    },
    [CertificateLevel.SENIOR_PROFESSIONAL_AGILE_COACH]: {
      baseColor: '#825AB9', radiaGradientColor: '#8E63CA'
    },
    [CertificateLevel.MASTER_AGILE_COACH]: {
      baseColor: '#4633A3', radiaGradientColor: '#5244A1'
    },
    [NonLinkedCertificateLevel.AGILE_COACH]: {
      baseColor: '#F68548', radiaGradientColor: '#F68548'
    },
    [NonLinkedCertificateLevel.JUNIOR_AGILE_COACH]: {
      baseColor: '#F68548', radiaGradientColor: '#F68548'
    },
    [NonLinkedCertificateLevel.TRAINEE_AGILE_COACH]: {
      baseColor: '#F68548', radiaGradientColor: '#F68548'
    }
  },
  [CertificateType.University]: {
    [CertificateLevel.ASSOCIATE_AGILE_COACH]: {
      baseColor: '#F6A559', radiaGradientColor: '#F38C48'
    },
    [CertificateLevel.PROFESSIONAL_AGILE_COACH]: {
      baseColor: '#81C1F1', radiaGradientColor: '#8CD0FF'
    },
    [CertificateLevel.SENIOR_PROFESSIONAL_AGILE_COACH]: {
      baseColor: '#318ACA', radiaGradientColor: '#1F71AC'
    },
    [CertificateLevel.MASTER_AGILE_COACH]: {
      baseColor: '#005FA3', radiaGradientColor: '#0B609D'
    },
    [NonLinkedCertificateLevel.AGILE_COACH]: {
      baseColor: '#F68548', radiaGradientColor: '#F68548'
    },
    [NonLinkedCertificateLevel.JUNIOR_AGILE_COACH]: {
      baseColor: '#F68548', radiaGradientColor: '#F68548'
    },
    [NonLinkedCertificateLevel.TRAINEE_AGILE_COACH]: {
      baseColor: '#F68548', radiaGradientColor: '#F68548'
    }
  }
};

export const Constants = {
  CERT_VIEWER_URL: environment.certViewUrl,
  REMOVE_BG_API_KEY: environment.REMOVE_BG_API_KEY,
  BACKGROUND_COLOR: {
    [CertificateLevel.PROFESSIONAL_AGILE_COACH]: {
      red: 246,
      green: 165,
      blue: 89
    },
    [CertificateLevel.SENIOR_PROFESSIONAL_AGILE_COACH]: {
      red: 247,
      green: 105,
      blue: 56
    },
    [CertificateLevel.MASTER_AGILE_COACH]: {
      red: 242,
      green: 82,
      blue: 72
    }
  }
};

export const DefaultQRCode = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 49" shape-rendering="crispEdges">' +
  '<path fill="#eaeaea" d="M0 0h49v49H0z"/></svg>';
